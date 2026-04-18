const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'afcfz11h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-19'
});

client.fetch('*[_type == "siteSettings"]{_id, contactInfo}').then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(err => {
  console.error(err);
});
