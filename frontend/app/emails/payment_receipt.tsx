import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface PaymentReceiptMailProps {
  userName: string;
  paymentAmount: number;
  mpesaRef: string;
  phoneNumber: string;
  itemPaidFor: "Subscription" | "Product";
}

export const PaymentReceiptMail = ({
  userName,
  mpesaRef,
  paymentAmount,
  phoneNumber,
  itemPaidFor,
}: PaymentReceiptMailProps) => (
  <Html>
    <Head />
    <Preview>Subscription payment</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`https://gym.ocluse.com/images/mainicon.jpg`}
            width="120"
            height="36"
            alt="Home Gym Logo"
          />
        </Section>
        <Heading style={h1}>Payment Receipt Confirmation</Heading>
        <Text style={heroText}>Hi {userName},</Text>
        <Text style={heroText}>
          Your payment has been received successfully.
        </Text>

        {/* <Section style={codeBox}>
          <Text style={confirmationCodeText}>{userName}</Text>
        </Section> */}
        <Section style={productTitleTable}>
          <Text style={productsTitle}>{`${itemPaidFor} payment`}</Text>
        </Section>
        <Section>
          <Column style={{ paddingLeft: "22px" }}>
            <Text style={productTitle}>{`${itemPaidFor}`}</Text>

            <Text style={productDescription}>
              Payment method &ldquo;mpesa&rdquo;
            </Text>
            <Text style={productDescription}>Phone {phoneNumber}</Text>
            <Text style={productDescription}>Ref {mpesaRef}</Text>
          </Column>
          <Column style={productPriceWrapper} align="right">
            <Text style={productPrice}>Kes {paymentAmount}</Text>
          </Column>
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Column style={tableCell} align="right">
            <Text style={productPriceTotal}>TOTAL</Text>
          </Column>
          <Column style={productPriceVerticalLine}></Column>
          <Column style={productPriceLargeWrapper}>
            <Text style={productPriceLarge}>Kes {paymentAmount}</Text>
          </Column>
        </Section>
        <Hr style={productPriceLineBottom} />
        {/* <Section style={codeBox}>
          <Text style={confirmationCodeText}>{userName}</Text>
        </Section> */}

        <Text style={text}>You can safely ignore ignore this email.</Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "80%" }}>
              <Img
                src={`https://gym.ocluse.com/images/mainicon.jpg`}
                width="120"
                height="36"
                alt="Home Gym"
              />
            </Column>
            <Column>
              <Row>
                <Column>
                  <Link href="https://twitter.com/lewynation29">
                    <Img
                      src={`https://gym.ocluse.com/images/twitterImage.jpg`}
                      width="32"
                      height="32"
                      alt="Twitter"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
                <Column>
                  <Link href="https://www.linkedin.com/in/lewisotieno29/">
                    <Img
                      src={`https://gym.ocluse.com/images/linkedInImage.jpg`}
                      width="32"
                      height="32"
                      alt="LinkedIn"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href="https://gym.ocluse.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our website
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Text style={footerTextAddress}>
            ©2024 Home Gym <br />
            11 Lower State House Road, Nairobi, KENYA <br />
            All rights reserved.
            <br />
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PaymentReceiptMail;

//
const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  color: "black",
};

// const productIcon = {
//   margin: '0 0 0 20px',
//   borderRadius: '14px',
//   border: '1px solid rgba(128,128,128,0.2)',
// };

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

// const divisor = {
//   marginLeft: '4px',
//   marginRight: '4px',
//   color: 'rgb(51,51,51)',
//   fontWeight: 200,
// };

// const productLink = {
//   fontSize: '12px',
//   color: 'rgb(0,112,201)',
//   textDecoration: 'none',
// };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};
const tableCell = { display: "table-cell" };

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLine = { margin: "30px 0 0 0" };
// const productPriceLineTop = { margin: '10px 0 0 0' };

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};
const productPriceLineBottom = { margin: "0 0 75px 0" };
//
// const footerText = {
//   fontSize: '12px',
//   color: '#b7b7b7',
//   lineHeight: '15px',
//   textAlign: 'left' as const,
//   marginBottom: '50px',
// };
const footerTextAddress = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  //   marginBottom: "10px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const getChamaApp = {
  color: "#b7b7b7",
  marginBottom: "32px",
  padding: "0",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  paddingLeft: "15px",
  paddingRight: "15px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

// const codeBox = {
//   background: 'rgb(245, 244, 245)',
//   borderRadius: '4px',
//   marginRight: '50px',
//   marginBottom: '30px',
//   padding: '43px 23px',
// };

// const confirmationCodeText = {
//   fontSize: '30px',
//   textAlign: 'center' as const,
//   verticalAlign: 'middle',
// };

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
