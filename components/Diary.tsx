import { useState } from "react";

interface Props {
  onPainEntry: (level: number) => void;
}

const Diary: React.FC<Props> = ({ onPainEntry }) => {
  const [painLevel, setPainLevel] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (painLevel !== null) {
      onPainEntry(painLevel);
      setPainLevel(null);
    }
  };

  const handlePainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);
    if (!isNaN(level) && level >= 0 && level <= 10) {
      setPainLevel(level);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label htmlFor="pain-level" className="mr-2">
        Pain level:
      </label>
      <input
        id="pain-level"
        type="number"
        min="0"
        max="10"
        value={painLevel !== null ? painLevel.toString() : ""}
        onChange={handlePainChange}
        className="mr-4"
      />
      <button type="submit" disabled={painLevel === null}>
        Submit
      </button>
    </form>
  );
};

export default Diary;
