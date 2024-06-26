import { signInAction } from "@/auth/actions";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="container mt-12">
      <div className="prose prose-lg">
        <h1>TODO</h1>
        <p>TODO</p>
        <form action={signInAction}>
          <button className="btn btn-neutral" type="submit">
            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
