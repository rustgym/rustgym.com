export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
}

const config: WebsiteConfig = {
  title: 'Rust Gym',
  description: 'A Gym for Coding',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/rust-gym-logo.png',
  lang: 'en',
  siteUrl: 'https://rustgym.com',
  facebook: 'https://www.facebook.com/rustgym',
  twitter: 'https://twitter.com/rustgym',
  showSubscribe: true,
  mailchimpAction: 'https://gmail.us20.list-manage.com/subscribe/post?u=ea2586fa442d44245186dd375&amp;id=4a96af3e9b',
  mailchimpName: 'b_ea2586fa442d44245186dd375_4a96af3e9b',
  mailchimpEmailFieldName: 'EMAIL',
  googleSiteVerification: 'GoogleCode',
  footer: 'A Gym for Coding',
};

export default config;
