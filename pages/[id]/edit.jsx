import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function Edit() {
  // solo obtener data para enviar al form
  const router = useRouter();
  const { id } = router.query;
  const { data: movie, error } = useSWR(
    id ? `/api/movie/${id}` : null,
    fetcher
  );

  if (error) return <p className="container my-3">Falló en la carga...</p>;
  if (!movie) return <p className="container my-3">Cargando...</p>;

  const movieForm = {
    title: movie.title,
    plot: movie.plot,
  };

  return <Form movieForm={movieForm} forNewMovie={false} />;
}
