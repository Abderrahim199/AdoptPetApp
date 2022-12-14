import { useParams } from "react-router-dom";
import { Component } from "react";
import Carousel from "./Carousel";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign(this.state, { loading: false }, json.pets[0]));
  }

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }
    const { name, animal, breed, description, city, state, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal}-{breed}-{city}, {state}
          </h2>
          <button>Adopt {name}</button>

          <p>{description}</p>
        </div>
      </div>
    );
  }
}
const warrapingDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};
export default warrapingDetails;
