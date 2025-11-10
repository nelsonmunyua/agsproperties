import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'
import left_arrow from './left_arrow.svg'
import right_arrow from './right_arrow.svg'
import header_img from './header_img.png'
import brand_img from './brand_img.png'
import brend_img from './brend_img.png'
import project_img_1 from './project_img_1.jpg'
import project_img_2 from './project_img_2.jpg'
import project_img_3 from './project_img_3.jpg'
import project_img_4 from './project_img_4.jpg'
import project_img_5 from './project_img_5.jpg'
import project_img_6 from './project_img_6.jpg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import property_img_1 from './property_img_1.png'
import property_img_2 from './property_img_2.png'
import property_img_3 from './property_img_3.png'
import property_img_4 from './property_img_4.png'
import property_img_5 from './property_img_5.png'
   

export const assets = {
    logo,
    logo_dark,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    brand_img,
    brend_img,
    project_img_1,
    project_img_2,
    project_img_3,
    project_img_4,
    left_arrow,
    right_arrow,
    property_img_1,
    property_img_2,
    property_img_3,
    property_img_4, 
    property_img_5,
    profile_img_1,
    profile_img_2,
    profile_img_3,
    // testimonial_img_1,
    // testimonial_img_2,
    // testimonial_img_3,
    // testimonial_img_4,
    // testimonial_img_5,  
    
}

export const propertyData = [
    {
      name: "Kiora Estate",
      size: "40x80 ft",
      priceRange: "2M - 3.2M",
      plots: 50,
      location: "Kiambu",
      features: ["Controlled Development", "Ready Title Deeds", "Serene Environment"],
      image: property_img_1
    },
    {
      name: "Anmer Estate", 
      size: "40x80 ft",
      priceRange: "1.5M - 2.2M",
      plots: 30,
      location: "Kiambu",
      features: ["Prime Location", "Ready Title Deeds", "Great Investment"],
      image: property_img_2,
   },
    {
      name: "Matropi Estate",
      size: "40x80 ft", 
      priceRange: "1.2M - 1.8M",
      plots: 60,
      location: "Near Migaa Estate",
      features: ["Affordable Pricing", "Ready Title Deeds", "Fast Developing Area"],
      image: property_img_3,
    },
    {
      name: "Twiga Estate",
      size: "40x80 ft",
      priceRange: "1.5M - 2.2M", 
      plots: 100,
      location: "Kiambu",
      features: ["Large Selection", "Ready Title Deeds", "Flexible Payment"],
      image: property_img_4,
    },
    {
      name: "Ostrich Plains",
      size: "50x100 ft",
      priceRange: "1.5M",
      plots: 75,
      location: "Kitengela, Namanga Road",
      features: ["Gated Community", "Borehole Water", "Electricity", "Flexible Payment Plan"],
      image: property_img_5,
     },
  ];

  export const testimonialsData = [
    {
      name: "Sarah Wanjiku",
      role: "Business Owner",
      rating: 5,
      content: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched.",
      avatar: profile_img_1
    },
    {
      name: "James Kiprotich",
      role: "Engineer",
      rating: 5,
      content: "AGS Property Services made my land purchase seamless. The flexible payment plan and ready title deeds gave me confidence in my investment.",
      avatar: profile_img_2
    },
    {
      name: "Grace Muthoni",
      role: "Teacher",
      rating: 4,
      content: "Professional service and great value for money. I'm happy with my plot at Kiora Estate and would recommend AGS to anyone looking for quality land.",
      avatar: profile_img_3
    }
];