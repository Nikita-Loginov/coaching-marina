import { getPerson } from "@/entities/person/model/person.queries";

import { HeaderClient } from "./HeaderClient";

export const Header = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  return (
    <HeaderClient
      name={person.name}
      middlename={person.middlename}
    />
  );
};

export default Header;