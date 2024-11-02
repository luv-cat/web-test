import { Button } from "@mantine/core";
import CategoryList, { Category } from "./components/CategoryList/CategoryList";
import { useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]); // カテゴリ一覧を管理
  const [error, setError] = useState<string | null>(null); // エラーメッセージを管理

  // 正規表現
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  // 入力が変わったときにバリデーションをチェック
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccessToken(value);
    setIsValid(regex.test(value));
  };

  // カテゴリ一覧を取得する関数
  const fetchCategories = async (token: string) => {
    const BASE_URL = "base_url";
    try {
      const response = await fetch(`${BASE_URL}/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // access_tokenをヘッダーに付与
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      // const data = await response.json();
      setCategories([
        {
          id: 1,
          name: "category1",
          notes: ["test", "test2"],
        },
        {
          id: 2,
          name: "category2",
          notes: ["test", "test3"],
        },
        {
          id: 3,
          name: "category3",
          notes: ["test", "test4"],
        },
      ]); // カテゴリ一覧をstateに保存
      setError(null); // エラーをクリア
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ボタンがクリックされた時に、inputとbuttonを無効化し、カテゴリを取得
  const handleLoginClick = () => {
    setIsDisabled(true); // ボタンと入力フィールドを無効化
    fetchCategories(accessToken); // access_tokenを利用してリクエスト発行
  };
  return (
    <div>
      <div>
        <input
          type="text"
          id="access_token"
          value={accessToken}
          onChange={handleInputChange}
          placeholder="Enter access token"
          disabled={isDisabled} // ボタンがクリックされた後は無効化
        />
        <Button
          id="login"
          onClick={handleLoginClick}
          disabled={!isValid || isDisabled} // ボタンがクリックされた後は無効化
        >
          LOGIN
        </Button>
        {/* エラーメッセージの表示 */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

export default App;
