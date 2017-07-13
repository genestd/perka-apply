var fs = require('fs')
var request = require('request')

var resume = fs.readFileSync('./david_genest_resume.pdf')
var resume64 = new Buffer(resume).toString('base64')

var application = {
  "first_name": "David",
  "last_name": "Genest",
  "email": "drwgenest@gmail.com",
  "position_id": "Web Application Engineer",
  "explanation": "I built a small node.js app to convert my resume to base64, then used request to send it to the API endpoint and capture the result",
  "projects": ["https://github.com/genestd", "https://genestd.github.io/portfolio2", "https://github.com/genestd/perka-apply", "https://www.linkedin.com/in/davegenest"],
  "source": "I discovered Perka on PortlandTech.org and was intrigued by the idea of applying via API.  The engineering positions are listed as NYC, but I hope you are considering Portland candidates as well",
  "resume": resume64
}

var url = "https://api.perka.com/1/communication/job/apply"
request({
    url: url,
    method: "POST",
    json: true,
    headers: { "content-type": "application/json" },
    body: application
},  function (error, resp, body) {
      if(error){ console.log(error)}
      console.log(body)
      fs.writeFileSync('output.txt', JSON.stringify(body))
    }
)
