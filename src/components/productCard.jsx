export default function ProductCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.image} />
      <p>Price LKR {props.price}</p>
    </div>
  );
}
