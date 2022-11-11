import { IntegrationBase } from "@budibase/types"
// @ts-ignore
import soapRequest from "easy-soap-request"

class CustomIntegration implements IntegrationBase {
  private readonly url: string

  constructor(config: { url: string; }) {
    this.url = config.url
  }

  async execute(query: { sql: string }) {
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
    }
    return await soapRequest({
      url: this.url,
      headers,
      xml: query.sql
    })
  }

  async create(query: { sql: string }) {
    return await this.execute(query)
  }

  async read(query: { sql: string }) {
    return await this.execute(query)
  }

  async update(query: { sql: string }) {
    return await this.execute(query)
  }

  async delete(query: { sql: string }) {
    return await this.execute(query)
  }
}

export default CustomIntegration
