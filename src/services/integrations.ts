export type IntegrationService = {
  id: string
  name: string
  description: string
  logo: string
}

export type IntegrationConnection = {
  id: string
  integrationId: string
  integrationName: string
  integrationLogo: string
  name: string
  source: "Carbon" | "Utility"
  entityGroup: string
  interval: string
}

export const integrationServices: IntegrationService[] = [
  {
    id: "amazon-quicksight",
    name: "Amazon QuickSight",
    description:
      "Amazon BI service to create dashboards and interactive visualisations.",
    logo: "/images/amazon_quicksight_logo.png",
  },
  {
    id: "kafka",
    name: "Kafka",
    description:
      "Real-time data streaming, event-driven architectures and messaging systems.",
    logo: "/images/kafka_logo.png",
  },
  {
    id: "power-bi",
    name: "Power BI",
    description:
      "Microsoft BI service to create dashboards and data visualisations.",
    logo: "/images/powerbi_logo.png",
  },
  {
    id: "zapier",
    name: "Zapier",
    description:
      "Automation tool that connects various apps and services to automate workflows.",
    logo: "/images/zapier_logo.png",
  },
  {
    id: "tableau",
    name: "Tableau",
    description:
      "BI service that helps seeing and transforming data into actionable insights.",
    logo: "/images/tableau_logo.png",
  },
  {
    id: "measurabl",
    name: "Measurabl",
    description:
      "Enable the push and pull of data to and from Measurabl via an API.",
    logo: "/images/measurabl_logo.png",
  },
]

export const integrationConnections: IntegrationConnection[] = [
  {
    id: "qs-energy",
    integrationId: "amazon-quicksight",
    integrationName: "Amazon QuickSight",
    integrationLogo: "/images/amazon_quicksight_logo.png",
    name: "Energy",
    source: "Carbon",
    entityGroup: "ABC Group LTD - Energy",
    interval: "-",
  },
  {
    id: "qs-logistics",
    integrationId: "amazon-quicksight",
    integrationName: "Amazon QuickSight",
    integrationLogo: "/images/amazon_quicksight_logo.png",
    name: "Logistics",
    source: "Carbon",
    entityGroup: "ABC Group LTD - Logistics",
    interval: "-",
  },
  {
    id: "qs-operations",
    integrationId: "amazon-quicksight",
    integrationName: "Amazon QuickSight",
    integrationLogo: "/images/amazon_quicksight_logo.png",
    name: "Operations",
    source: "Carbon",
    entityGroup: "ABC Group LTD - Operations",
    interval: "-",
  },
  {
    id: "qs-electricity-tou",
    integrationId: "amazon-quicksight",
    integrationName: "Amazon QuickSight",
    integrationLogo: "/images/amazon_quicksight_logo.png",
    name: "Electricity ToU",
    source: "Utility",
    entityGroup: "135 Albert St - Electricity",
    interval: "ToU",
  },
  {
    id: "qs-water",
    integrationId: "amazon-quicksight",
    integrationName: "Amazon QuickSight",
    integrationLogo: "/images/amazon_quicksight_logo.png",
    name: "Water",
    source: "Utility",
    entityGroup: "135 Albert St - Water",
    interval: "Monthly",
  },
  {
    id: "kafka-abc",
    integrationId: "kafka",
    integrationName: "Kafka",
    integrationLogo: "/images/kafka_logo.png",
    name: "ABC Group LTD",
    source: "Carbon",
    entityGroup: "ABC Group LTD",
    interval: "-",
  },
  {
    id: "zapier-abc",
    integrationId: "zapier",
    integrationName: "Zapier",
    integrationLogo: "/images/zapier_logo.png",
    name: "ABC Group LTD",
    source: "Carbon",
    entityGroup: "ABC Group LTD",
    interval: "-",
  },
  {
    id: "zapier-gas",
    integrationId: "zapier",
    integrationName: "Zapier",
    integrationLogo: "/images/zapier_logo.png",
    name: "135 Albert St - Gas",
    source: "Utility",
    entityGroup: "135 Albert St - Gas",
    interval: "Yearly",
  },
]

export async function fetchIntegrationServices(): Promise<IntegrationService[]> {
  return Promise.resolve(integrationServices)
}

export async function fetchIntegrationConnections(): Promise<
  IntegrationConnection[]
> {
  return Promise.resolve(integrationConnections)
}
