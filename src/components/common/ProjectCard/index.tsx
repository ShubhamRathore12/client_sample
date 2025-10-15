import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Project } from "../../../types/projects";
import { useSpring, animated, config, useTrail, useSpringRef } from "@react-spring/web";
import WebGLBackground from "./WebGLBackground";

interface ProjectCardProps extends Project {
  onClick: () => void;
  selected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  displayName,
  description,
  icon,
  bgColor,
  textColor,
  onClick,
  selected = false,
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
    -(y - rect.top - rect.height / 2) / 20,
    (x - rect.left - rect.width / 2) / 20,
    1.05,
  ];

  const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  // Animation for the icon container
  const [iconSpring, iconApi] = useSpring(() => ({
    from: { scale: 1, rotateZ: 0 },
    config: config.wobbly
  }));

  // Animation for the content
  const [contentSpring, contentApi] = useSpring(() => ({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: config.slow
  }));

  // Animation for the arrow
  const [arrowSpring, arrowApi] = useSpring(() => ({
    from: { x: 0, rotateZ: 0 },
    config: config.stiff
  }));

  // Update animations on hover
  useEffect(() => {
    if (isHovered) {
      iconApi.start({
        to: [
          { scale: 1.1, rotateZ: 5 },
          { scale: 1, rotateZ: -5 },
          { scale: 1.05, rotateZ: 0 }
        ],
        config: config.wobbly
      });
      arrowApi.start({
        x: 10,
        rotateZ: 45,
        config: config.stiff
      });
    } else {
      iconApi.start({
        scale: 1,
        rotateZ: 0,
        config: config.gentle
      });
      arrowApi.start({
        x: 0,
        rotateZ: 0,
        config: config.gentle
      });
    }
  }, [isHovered, iconApi, arrowApi]);

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '16px',
    }}>
      <WebGLBackground />
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
          position: 'relative',
          width: "100%",
          height: '100%',
          transform: props.xys.to(trans),
          cursor: "pointer",
          willChange: "transform",
          zIndex: 1,
        }}
      >
      <Box
        sx={{
          width: "100%",
          border: selected ? 2 : 1,
          borderRadius: 4,
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          ...(bgColor
            ? { background: bgColor }
            : {
                backgroundColor: selected
                  ? theme.palette.background.accentBg ||
                    theme.palette.action.selected
                  : theme.palette.background.paper,
              }),
          borderColor: selected
            ? theme.palette.primary.main
            : theme.palette.background.border || theme.palette.divider,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isHovered
            ? theme.shadows[8]
            : theme.shadows[1],
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 0,
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        {/* Left: Lottie Animation + Text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flex: 1,
          }}
        >
          <animated.div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: textColor
                ? "rgba(255,255,255,0.15)"
                : theme.palette.background.default,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: theme.shadows[2],
              transform: iconSpring.scale.to(s => `scale(${s}) rotateZ(${iconSpring.rotateZ}deg)`),
            }}
          >
            {icon ? (
              <img
                src={icon}
                alt={displayName}
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: textColor || theme.palette.primary.main,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: textColor || theme.palette.text.primary,
                fontSize: "1.1rem",
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {displayName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: textColor
                  ? "rgba(255,255,255,0.9)"
                  : theme.palette.text.secondary,
                fontSize: "0.9rem",
                lineHeight: 1.4,
              }}
            >
              {description}
            </Typography>
          </animated.div>
        </Box>

        {/* Right: Animated Arrow */}
        <animated.div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 8,
          }}
        >
          <animated.div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: textColor
                ? "rgba(255,255,255,0.2)"
                : theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: arrowSpring.x.to(x => `0 2px ${x}px rgba(0,0,0,0.2)`),
            }}
          >
            <animated.span
              style={{
                color: textColor || theme.palette.primary.contrastText,
                fontSize: "1.2rem",
                fontWeight: 600,
                display: 'inline-block',
                transform: arrowSpring.x.to(x => `translateX(${x}px) rotateZ(${arrowSpring.rotateZ}deg)`),
              }}
            >
              →
            </animated.span>
          </animated.div>
        </animated.div>
        </Box>
      </animated.div>
    </Box>
  );
};

export default ProjectCard;