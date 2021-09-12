export default function Admin() {
  const { data: session } = useSession();

  return <p>Super secret dashboard</p>;
}

Admin.auth = true;
