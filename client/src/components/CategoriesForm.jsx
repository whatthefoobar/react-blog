import React from "react";

const CategoriesForm = ({ selectedCategories, setSelectedCategories }) => {
  const categoriesList = [
    "music",
    "tech",
    "diy",
    "health",
    "fashion",
    "economy",
    "activism",
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
    }
  };

  return (
    <fieldset className="categoryForm">
      <legend>Choose categories:</legend>
      {categoriesList.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            value={category}
            onChange={handleCategoryChange}
            checked={selectedCategories.includes(category)}
          />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </label>
      ))}
    </fieldset>
  );
};

export default CategoriesForm;
