import { Html, Heading, Text, Body } from '@react-email/components';
import { formStore } from '@/utils/stores/formStore';

export const RequestMail = ({ ...formStore }) => {
  const {
    surname,
    setSurname,
    firstname,
    setFirstname,
    email,
    setEmail,
    birthday,
    setBirthday,
    phone,
    setPhone,
    text,
    setText,
  } = useStore(formStore);

  return (
    <Html lang="en">
      <Body>
        <Heading as="h1">New Form Submission</Heading>
        <Text>Name: {firstname}</Text>
        <Text>Email: {email}</Text>
        <Text>Geburtstag: {birthday}</Text>
        <Text>Telefonnummer: {phone}</Text>
        <Text>Nachricht: {text}</Text>
      </Body>
    </Html>
  );
};
export default RequestMail;
