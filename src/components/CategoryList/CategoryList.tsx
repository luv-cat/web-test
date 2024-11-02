import React, { useState } from "react";

// CategoryListコンポーネントの型定義
export type Category = {
  id: number;
  name: string;
  notes: string[];
};

type CategoryListProps = {
  categories: Category[];
};

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null); // アクティブなカテゴリを管理

  // カテゴリをクリックした時にアコーディオンを開閉
  const handleCategoryClick = (categoryId: number) => {
    if (activeCategory === categoryId) {
      // すでに開いているカテゴリをクリックした場合、閉じる
      setActiveCategory(null);
    } else {
      // 他のカテゴリを開いた場合、それをアクティブに
      setActiveCategory(categoryId);
    }
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id} id={`category-${category.id}`}>
          <div
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </div>

          {/* アクティブなカテゴリの場合、メモを表示 */}
          {activeCategory === category.id && (
            <ul>
              {category.notes.map((note, index) => (
                <li key={index} id={`category-${category.id}-title`}>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
