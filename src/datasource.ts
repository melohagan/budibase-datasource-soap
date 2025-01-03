import { IntegrationBase } from "@budibase/types"
// @ts-ignore
import soapRequest from "easy-soap-request"
// @ts-ignore
import xml2js from "xml2js"

class CustomIntegration implements IntegrationBase {
  private readonly url: string

  constructor(config: { url: string; }) {
    this.url = config.url
  }

  async execute(query: { body: string; soapAction: string }) {
    const headers: any = {
      'Content-Type': 'text/xml;charset=UTF-8',
    }
    if (query.soapAction) {
      headers["soapAction"] = query.soapAction
    }
    const responseBody = await soapRequest({
      url: this.url,
      headers,
      xml: query.body
    })
    const parseString = xml2js.parseString
    let jsonBody
    parseString(responseBody?.response?.body, (err: any, res: any) => {
      const prefixFound = responseBody?.response?.body?.match(/<(.+?):(envelope)/i)
      const prefix = prefixFound?.[1] ? prefixFound[1].trim() + ":" : ""
      jsonBody = res[prefix + "Envelope"]?.[prefix + "Body"]?.[0] ?? {}
      if (err) throw err
    })
    return jsonBody
  }

  async create(query: { body: string; soapAction: string }) {
    return await this.execute(query)
  }

  async read(query: { body: string; soapAction: string }) {
    return await this.execute(query)
  }

  async update(query: { body: string; soapAction: string }) {
    return await this.execute(query)
  }

  async delete(query: { body: string; soapAction: string }) {
    return await this.execute(query)
  }
}

export default CustomIntegration
