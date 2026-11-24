import { useUser } from "../../js/hooks/useUser";
import "../../css/Home/Home.css";

// The welcome page (/:username) - shown right after login / register.
// Only a greeting - the user chooses where to go from the menu in the Header.
export default function Home() {
  const { user } = useUser(); // the logged-in user, from UserContext

  return (
    <section className="home">
      <h2>
        Good to see you, <span>{user.name}</span>
      </h2>
      <p>Choose where to go from the menu above.</p>
    </section>
  );
}
