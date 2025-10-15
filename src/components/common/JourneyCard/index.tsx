import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme, Card, CardContent } from "@mui/material";
import { useSpring, animated, config } from "@react-spring/web";
import { JourneyItem } from "../../../types/journey";

interface JourneyCardProps extends JourneyItem {
  onClick: () => void;
  isActive?: boolean;
}

const JourneyCard: React.FC<JourneyCardProps> = ({
  title,
  description,
  icon,
  status,
  onClick,
  isActive = false,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt animation
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const calc = (x: number, y: number, rect: DOMRect) => [
    -(y - rect.top - rect.height / 2) / 30,
    (x - rect.left - rect.width / 2) / 30,
    1.03
  ];

  const trans = (x: number, y: number, s: number) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  // Status color mapping
  const statusColors = {
    completed: theme.palette.success.main,
    inProgress: theme.palette.warning.main,
    pending: theme.palette.grey[400],
    upcoming: theme.palette.primary.main,
  };

  // Animation for the status indicator
  const [statusSpring, statusApi] = useSpring(() => ({
    width: isActive ? '100%' : '4px',
    config: config.stiff
  }));

  // Animation for the content
  const [contentSpring, contentApi] = useSpring(() => ({
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.slow
  }));

  // Animation for the icon
  const [iconSpring, iconApi] = useSpring(() => ({
    from: { scale: 1 },
    config: config.wobbly
  }));

  // Update animations on hover/active state
  useEffect(() => {
    if (isHovered || isActive) {
      iconApi.start({
        to: [
          { scale: 1.2, rotateZ: 5 },
          { scale: 1.1, rotateZ: -5 },
          { scale: 1.15, rotateZ: 0 }
        ],
        config: config.wobbly
      });
      statusApi.start({
        width: '100%',
        config: config.stiff
      });
    } else {
      iconApi.start({
        scale: 1,
        rotateZ: 0,
        config: config.gentle
      });
      statusApi.start({
        width: isActive ? '100%' : '4px',
        config: config.gentle
      });
    }
  }, [isHovered, isActive, iconApi, statusApi]);

  return (
    <animated.div
      ref={cardRef}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        set({ xys: [0, 0, 1] });
      }}
      onMouseMove={(e) => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          set({ xys: calc(e.clientX, e.clientY, rect) });
        }
      }}
      style={{
        width: '100%',
        transform: props.xys.to(trans),
        cursor: 'pointer',
        willChange: 'transform',
        marginBottom: theme.spacing(2),
      }}
    >
      <Card
        elevation={isHovered || isActive ? 8 : 2}
        sx={{
          borderRadius: 2,
          overflow: 'visible',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered || isActive ? 'translateY(-2px)' : 'translateY(0)',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: statusColors[status],
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <animated.div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${statusColors[status]}`,
                transform: iconSpring.scale.to(s => `scale(${s}) rotateZ(${iconSpring.rotateZ || 0}deg)`),
              }}
            >
              {icon || (
                <Box
                  component="span"
                  sx={{
                    color: statusColors[status],
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {title.charAt(0).toUpperCase()}
                </Box>
              )}
            </animated.div>

            <animated.div 
              style={{
                flex: 1,
                opacity: contentSpring.opacity,
                transform: contentSpring.y.to(y => `translateY(${y}px)`)
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: isActive || isHovered ? theme.palette.primary.main : 'text.primary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {title}
                </Typography>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: `${statusColors[status]}15`,
                    color: statusColors[status],
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {status.replace(/([A-Z])/g, ' $1').trim()}
                </Box>
              </Box>
              
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.5,
                }}
              >
                {description}
              </Typography>
            </animated.div>
          </Box>
        </CardContent>
        
        <animated.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '4px',
            background: statusColors[status],
            ...statusSpring,
          }}
        />
      </Card>
    </animated.div>
  );
};

export default JourneyCard;
