import Form from "../components/Form";

export default function New() {
  const movieForm = {
    title: "",
    plot: "",
  };

  return <Form movieForm={movieForm} />;
}
