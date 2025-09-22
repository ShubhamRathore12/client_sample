export interface ITestimonial {
  src: string;
  name: string;
  designation: string;
  message: string;
  rating: number; // out of 5
}

const testimonials: ITestimonial[] = [
  {
    src: "/assets/landing/testimonials/ankur.png",
    name: "Ankur Gulyani",
    designation: "Product Manager",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum nulla ac ac vitae. Non aliquam nisl, vulputate ut nisl urna adipiscing. Ullamcorper commodo enim mi, nisi, interdum diam venenatis malesuada lorem. ",
    rating: 4.9,
  },
  {
    src: "/assets/landing/testimonials/ankur.png",
    name: "Ankur Gulyani 2",
    designation: "Product Manager",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum nulla ac ac vitae. Non aliquam nisl, vulputate ut nisl urna adipiscing. Ullamcorper commodo enim mi, nisi, interdum diam venenatis malesuada lorem. ",
    rating: 4.9,
  },
  {
    src: "/assets/landing/testimonials/ankur.png",
    name: "Ankur Gulyani 3",
    designation: "Product Manager",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum nulla ac ac vitae. Non aliquam nisl, vulputate ut nisl urna adipiscing. Ullamcorper commodo enim mi, nisi, interdum diam venenatis malesuada lorem. ",
    rating: 4.9,
  },
];

export default testimonials;
