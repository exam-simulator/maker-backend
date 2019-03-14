const mjml2html = require('mjml')
const partials = require('../partials')

module.exports = async (username, title) => {
  const data = await mjml2html(`
    <mjml>
      ${partials.head}
      <mj-body>
        ${partials.header}
        <mj-section padding="10px" background-color="#fafafa">
          <mj-column>
            <mj-text align="justify" font-family="Open Sans" font-size="18px">
              Hey ${username}! Your exam "${title}" has been submitted for verification. The verification process typically takes 24-48 hours.</mj-text>
          </mj-column>
        </mj-section>
        <mj-section padding="10px" background-color="#fafafa">
          <mj-column>
            <mj-text font-family="Open Sans" font-size="18px">Thank You for contributing to Exam Maker.</mj-text>
          </mj-column>
        </mj-section>
        ${partials.footer}
      </mj-body>
    </mjml>
  `)
  return data.html
}
