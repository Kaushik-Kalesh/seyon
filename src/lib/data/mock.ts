export interface Valve {
  id: string;
  slug: string;
  name: string;
  industrySlug: string;
  description: string;
  imageUrl: string;
  specs: {
    material: string;
    pressureRating: string;
    temperatureRange: string;
    size: string;
  };
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const industries: Industry[] = [
  {
    id: "ind-1",
    slug: "oil-and-gas",
    name: "Oil & Gas",
    description: "High-performance valves designed for extreme pressures and temperatures in the oil and gas sector.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"
  },
  {
    id: "ind-2",
    slug: "water-treatment",
    name: "Water Treatment",
    description: "Reliable and durable valves for municipal and industrial water treatment facilities.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"
  },
  {
    id: "ind-3",
    slug: "power-generation",
    name: "Power Generation",
    description: "Precision engineered valves ensuring safety and efficiency in power plants.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"
  },
  {
    id: "ind-4",
    slug: "chemical-processing",
    name: "Chemical Processing",
    description: "Corrosion-resistant valves built to handle aggressive chemical flows.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"
  }
];

export const valves: Valve[] = [
  {
    id: "v-1",
    slug: "api-6d-trunnion-ball-valve",
    name: "API 6D Trunnion Ball Valve",
    industrySlug: "oil-and-gas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "Carbon Steel / Stainless Steel",
      pressureRating: "Class 150 to 2500",
      temperatureRange: "-46°C to +200°C",
      size: "2\" to 48\""
    }
  },
  {
    id: "v-2",
    slug: "cast-steel-gate-valve",
    name: "Cast Steel Gate Valve",
    industrySlug: "oil-and-gas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "WCB, LCB, WC6, WC9",
      pressureRating: "Class 150 to 2500",
      temperatureRange: "-29°C to +425°C",
      size: "2\" to 36\""
    }
  },
  {
    id: "v-3",
    slug: "resilient-seated-butterfly-valve",
    name: "Resilient Seated Butterfly Valve",
    industrySlug: "water-treatment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "Ductile Iron",
      pressureRating: "PN10 / PN16",
      temperatureRange: "-10°C to +120°C",
      size: "2\" to 24\""
    }
  },
  {
    id: "v-4",
    slug: "non-return-check-valve",
    name: "Non-Return Check Valve",
    industrySlug: "water-treatment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "Cast Iron",
      pressureRating: "PN16",
      temperatureRange: "0°C to +80°C",
      size: "2\" to 12\""
    }
  },
  {
    id: "v-5",
    slug: "high-pressure-globe-valve",
    name: "High Pressure Globe Valve",
    industrySlug: "power-generation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "Alloy Steel F22, F91",
      pressureRating: "Class 1500 to 4500",
      temperatureRange: "Up to 600°C",
      size: "1/2\" to 4\""
    }
  },
  {
    id: "v-6",
    slug: "ptfe-lined-plug-valve",
    name: "PTFE Lined Plug Valve",
    industrySlug: "chemical-processing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg",
    specs: {
      material: "Ductile Iron lined with PFA/PTFE",
      pressureRating: "Class 150",
      temperatureRange: "-30°C to +200°C",
      size: "1/2\" to 10\""
    }
  }
];
