export const categoryColors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  FINANCE: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    hover: "hover:bg-blue-100"
  },
  TECH: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    hover: "hover:bg-purple-100"
  },
  CAREER: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    hover: "hover:bg-green-100"
  },
  EDUCATION: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    hover: "hover:bg-amber-100"
  },
  REGULATIONS: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    hover: "hover:bg-red-100"
  },
  LIFESTYLE: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
    hover: "hover:bg-pink-100"
  },
  SKILLS: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    hover: "hover:bg-indigo-100"
  },
};

export const getCategoryColor = (category: string) => {
  const upperCategory = category.toUpperCase();
  return categoryColors[upperCategory] || {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    hover: "hover:bg-gray-100"
  };
};