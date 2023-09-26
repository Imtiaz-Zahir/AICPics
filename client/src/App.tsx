import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {data.map((item:{id:string}) => (
        <img key={item.id} className="max-w-[450px] min-w-[300px]" src={`http://localhost:3000/image/${item.id}?w=${'450'}`} alt="" />
      ))}
    </div>
  );
}
