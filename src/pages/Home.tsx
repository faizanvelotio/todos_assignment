import { useHistory } from "react-router-dom";
function Home() {
  const history = useHistory();

  const onClick = () => {
    history.push("/users");
  };
  return (
    <div>
      This is the home page of hosts and todos assignment
      <br />
      <div
        style={{
          color: "blue",
          textDecorationLine: "underline",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        Users
      </div>
    </div>
  );
}

export default Home;
