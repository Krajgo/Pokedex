import className from "classnames";

function StatBar({ stat, value }) {
  const klasa = className(
    "animate-[fill_0.6s_ease-in-out]",
    " h-3 rounded-3xl drop-shadow-lg ",
    value >= 0 && value < 60
      ? "bg-gradient-to-t from-red-500 to-red-700"
      : value >= 60 && value < 100
      ? "bg-gradient-to-t from-yellow-300 to-yellow-500"
      : value >= 100 && value < 150
      ? "bg-gradient-to-t from-green-400 to-green-600"
      : "bg-gradient-to-t from-blue-500 to-blue-700"
  );
  return (
    <tr>
      <th className="w-32">{stat}:</th>
      <td className="w-8">{value}</td>
      <td className="w-full">
        <div
          key={1}
          className={klasa}
          style={{ width: `${(value / 255) * 100}%` }}
        />
      </td>
    </tr>
  );
}

export default StatBar;
