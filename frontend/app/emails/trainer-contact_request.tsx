import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TrainerContactRequestEmailProps {
  userFirstname: string;
  trainerName: string;
}

export const TrainerContactRequest = ({
  userFirstname,
  trainerName,
}: TrainerContactRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>
      We will help you build your ideal body and live your life to the fullest
      all at home.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://gym.ocluse.com/images/mainicon.jpg`}
          width="170"
          height="50"
          alt="Home Gym Logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Your request to {trainerName} has been sent. We will notify you once{" "}
          {trainerName} responds to your request. You can view your dashboard to
          see the status of your request.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://gym.ocluse.com/dashboard">
            View your Dashboard
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Home Gym team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>11 - State House Road, Nairobi, Kenya</Text>
      </Container>
    </Body>
  </Html>
);

TrainerContactRequest.PreviewProps = {
  userFirstname: "Alan",
} as TrainerContactRequestEmailProps;

export default TrainerContactRequest;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#abdf3a",
  borderRadius: "3px",
  color: "#000000",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
