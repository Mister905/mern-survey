const keys = require("../../config/keys");
const mjml2html = require("mjml");
/* 
  npm i mjml
  https://mjml.io/templates
  https://mjml.io/try-it-live/templates/referral-email 
*/

module.exports = survey => {
  const survey_template = mjml2html(
    `
    <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all padding="0px"></mj-all>
        <mj-text font-family="Ubuntu, Helvetica, Arial, sans-serif" padding="0 25px" font-size="13px"></mj-text>
        <mj-section background-color="#fff"></mj-section>
        <mj-class name="preheader" color="#DDD" font-size="11px"></mj-class>
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#000000">
      <mj-section>
        <mj-column background-color="#000000">
          <mj-image width="350px" src="https://i.ibb.co/gR18nCB/logo-bg-black.jpg" alt="header image" padding="0px"></mj-image>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FDB71B" padding-bottom="20px" padding-top="10px">
        <mj-column>
          <mj-text align="center" padding="10px 25px" font-size="20px" color="#000"><strong>MERN-Survey</strong></mj-text>
          <mj-text align="center" padding="10px 25px" font-size="20px" color="#000"><strong>We'd Love to Hear from You</strong></mj-text>
          <mj-text align="center" color="#000" font-size="20px" font-family="Arial, sans-serif" font-weight="bold" line-height="35px" padding-top="10px">Please answer the following question:</mj-text>
          <mj-text align="center" color="#000" font-size="20px" font-family="Arial, sans-serif" font-weight="bold" line-height="35px" padding-top="10px">${survey.body}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FDB71B">
        <mj-column>
          <mj-button background-color="#000" color="#fff" href="${keys.email_redirect_domain}/surveys/response/${survey.id}/yes" font-family="Arial, sans-serif" padding="20px 0 0 150px" font-weight="bold" font-size="16px">YES</mj-button>
        </mj-column>
        <mj-column>
          <mj-button background-color="#000" color="#fff" href="${keys.email_redirect_domain}/surveys/response/${survey.id}/no" font-family="Arial, sans-serif" padding="20px 150px 0 0" font-weight="bold" font-size="16px">NO</mj-button>
          <mj-text align="center" color="#000000" font-size="14px" font-family="Arial, sans-serif" padding-top="40px"><br></br>
            <br></br>
            <br></br>
            <br></br>
            <p></p>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`
  );

  return survey_template.html;
};
