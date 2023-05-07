interface Company {
  name: string;
  link: string;
  linkName: string;
}

const companies: Company[] = [
  {
    name: "Ping.gg",
    linkName: "ping.gg",
    link: "https://ping.gg",
  },
  {
    name: "Nexiona",
    linkName: "nexiona.com",
    link: "https://nexiona.com",
  },
  {
    name: "Layer3",
    linkName: "layer3.xyz",
    link: "https://layer3.xyz",
  },
  {
    name: "EcoToken",
    linkName: "ecotokens.net",
    link: "https://ecotokens.net",
  },
  {
    name: "Civitai",
    linkName: "civitai.com",
    link: "https://civitai.com",
  },
];

export default function CompanyList({
  companyIntl = "Description",
  linkIntl = "Link",
}: {
  companyIntl: string;
  linkIntl: string;
}) {
  return (
    <table>
      <tr>
        <th>{companyIntl}</th>
        <th>{linkIntl}</th>
      </tr>
      {companies.map((company) => (
        <tr>
          <td>{company.name}</td>
          <td>
            <a href={company.link}>{company.linkName}</a>
          </td>
        </tr>
      ))}
    </table>
  );
}
