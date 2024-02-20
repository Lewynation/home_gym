interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  short_description: string;
}

const products: Product[] = [
  {
    name: "Fitbit Tracker Series 1",
    category: "wearable",
    price: 17500,
    image: "35ba06e71c4d190daae96ce5b41e2910.jpg",
    description:
      "Stay on top of your fitness goals with the Fitbit Tracker Series 1. This sleek wearable combines style with functionality, providing real-time health insights and activity tracking. Elevate your fitness journey effortlessly.",
    short_description: "Sleek Fitness Tracker",
  },
  {
    name: "Fitbit Tracker Series 2",
    category: "wearable",
    price: 25000,
    image: "75bb01aac8b40cfb19eda02bf94c1a5c.jpg",
    description:
      "Introducing the Fitbit Tracker Series 2, your perfect fitness companion. With advanced features and a stylish design, this wearable ensures you stay motivated and informed throughout your fitness routine. Embrace a healthier lifestyle with every step.",
    short_description: "Advanced Fitness Companion",
  },
  {
    name: "Nike SE 5.0",
    category: "wearable",
    price: 33000,
    image: "e4d63d44a2ff99593669890b5f9c93df.jpg",
    description:
      "Unleash the power of the Nike SE 5.0, a cutting-edge wearable designed for fitness enthusiasts. With superior performance and a touch of sporty elegance, this device is engineered to elevate your workouts and keep you at the top of your game.",
    short_description: "Sporty Wearable",
  },
  {
    name: "Rad Dots",
    category: "wearable",
    price: 15000,
    image: "756783e7de9ecf1906cb854e9e853d10.jpg",
    description:
      "Add a touch of vibrancy to your workout wardrobe with Rad Dots, the trendy wearable that fuses fashion with function. Whether you're hitting the gym or the streets, make a statement with this stylish and comfortable accessory.",
    short_description: "Stylish Fitness",
  },
  {
    name: "PRX Fitness Pro Smart Watch",
    category: "wearable",
    price: 15000,
    image: "e4f70c021dfbfdaf0a125b872ef81855.jpg",
    description:
      "Elevate your fitness routine with the PRX Fitness Pro Smart Watch. Packed with features like heart rate monitoring and workout tracking, this smartwatch is your personal fitness coach on your wrist, ensuring every move counts.",
    short_description: "Smart Fitness Coach",
  },
  {
    name: "Fitbit Series 1",
    category: "wearable",
    price: 13500,
    image: "efd3045da28f5abc7ea6cd0ef52adfa9.jpg",
    description:
      "Experience the next level of fitness tracking with the Fitbit Series 1. This affordable yet feature-packed wearable is perfect for beginners and seasoned fitness enthusiasts alike. Achieve your health goals with ease.",
    short_description: "Affordable Tracker",
  },
  {
    name: "Weight Plates",
    category: "gym",
    price: 7500,
    image: "weightplates.jpg",
    description:
      "Build strength and muscle with our high-quality Weight Plates. Crafted for durability and precision, these plates are essential for any serious weightlifting routine. Maximize your gains with every rep.",
    short_description: "Build Strength",
  },
  {
    name: "Barbell",
    category: "gym",
    price: 5000,
    image: "barbell.jpg",
    description:
      "The Barbell, a timeless classic in strength training. Perfect for a variety of exercises, this versatile piece of equipment is a must-have in any home or commercial gym. Unleash your inner strength with every lift.",
    short_description: "Timeless Strength",
  },
  {
    name: "Kettlebell",
    category: "gym",
    price: 3000,
    image: "kettlebel.jpg",
    description:
      "Sculpt and tone with our premium Kettlebell. Whether you're a beginner or a seasoned pro, this compact and efficient tool is designed for a full-body workout. Embrace the kettlebell revolution.",
    short_description: "Versatile Workout",
  },
  {
    name: "Hydrow Rower",
    category: "gym",
    price: 3000,
    image: "hydrorower.jpg",
    description:
      "Immerse yourself in the ultimate rowing experience with the Hydrow Rower. Designed for fluidity and comfort, this rowing machine offers a total-body workout that simulates the feel of rowing on water. Row your way to fitness.",
    short_description: "Immersive Rowing",
  },
  {
    name: "Punching Bag",
    category: "gym",
    price: 15000,
    image: "punchingbag.jpg",
    description:
      "Release stress and enhance your martial arts skills with our high-quality Punching Bag. Built for durability and impact absorption, this essential gym equipment is perfect for both beginners and seasoned fighters alike.",
    short_description: "Stress Release",
  },
  {
    name: "Resistance Bands",
    category: "gym",
    price: 15000,
    image: "resistancebands.jpg",
    description:
      "Take your workout to the next level with our versatile Resistance Bands. Ideal for strength training and flexibility exercises, these bands offer a full-body workout experience. Strengthen, tone, and achieve your fitness goals.",
    short_description: "Full-Body Workout",
  },
  {
    name: "Exercise Bike",
    category: "featured",
    price: 27500,
    image: "exercisebike.jpg",
    description:
      "Revolutionize your cardio routine with our state-of-the-art Exercise Bike. Designed for comfort and performance, this bike offers a smooth ride and customizable resistance levels. Get ready to pedal your way to fitness.",
    short_description: "Cardio Revolution",
  },
  {
    name: "Yoga Mat",
    category: "featured",
    price: 5000,
    image: "yogamat.jpg",
    description:
      "Enhance your yoga practice with our premium Yoga Mat. Crafted for comfort and durability, this non-slip mat provides the perfect foundation for your poses and stretches. Elevate your yoga experience.",
    short_description: "Comfortable Yoga",
  },
  {
    name: "Treadmill",
    category: "featured",
    price: 33000,
    image: "treadmill.jpg",
    description:
      "Bring the gym to your home with our high-performance Treadmill. Whether you're a seasoned runner or just starting your fitness journey, this treadmill offers a variety of workout programs and incline options. Run towards a healthier you.",
    short_description: "Home Running",
  },
  {
    name: "Rubber-Coated Kettlebell",
    category: "featured",
    price: 13000,
    image: "dac88aa9d9661fb1c908b750a006e986.jpg",
    description:
      "Experience the perfect blend of style and functionality with our Rubber-Coated Kettlebell. Designed for durability and versatility, this kettlebell is a must-have for any home gym. Sculpt and strengthen with confidence.",
    short_description: "Stylish Strength",
  },
  {
    name: "Bowflex PR3000",
    category: "featured",
    price: 55000,
    image: "pr3000.jpg",
    description:
      "Transform your home gym with the Bowflex PR3000. This versatile piece of equipment offers a wide range of exercises, ensuring a full-body workout. Take your fitness journey to the next level with the PR3000.",
    short_description: "Versatile Home Gym",
  },
  {
    name: "Bowflex PR6000",
    category: "featured",
    price: 63500,
    image: "c58c300f65604340f6a3d1dfd26f4179.jpg",
    description:
      "Experience unparalleled strength training with the Bowflex PR6000. Designed for maximum performance and versatility, this home gym system allows you to target every muscle group. Elevate your fitness routine with the PR6000.",
    short_description: "Total Body Workout",
  },
];

export default products;
