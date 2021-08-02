import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import dbConnect from "../../lib/dbConnect";
import Movie from "../../models/Movie";

export default function Index({ movie }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const movieId = router.query.id;
    try {
      await fetch(`/api/movie/${movieId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      setMessage("Error al eliminar");
    }
  };

  return (
    <div className="container">
      <h1 className="my-2">Detalle:</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title text-uppercase">
            <h5>{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
          <Link href="/[id]/edit" as={`/${movie._id}/edit`}>
            <a className="btn btn-warning me-2">Editar</a>
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();
    // https://mongoosejs.com/docs/tutorials/lean.html
    const movie = await Movie.findById(params.id).lean();
    movie._id = movie._id.toString();
    return { props: { movie } };
  } catch (error) {
    console.log("error", error);
  }
}
