import Td from "./Td";

function Tr({ info }) {
  return (
    <tbody>
      {info.map((item) => {
        return <Td key={item.id} item={item}></Td>;
      })}
    </tbody>
  );
}
export default Tr;
