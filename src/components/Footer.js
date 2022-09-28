import FooterCss from './Footer.module.css'
const Footer = (props)=>{
return (
    <>
      <div className={FooterCss.footer}>
      <h6>About</h6>
            <p >Readbook.com <i>A BOOK FOR EVERYONE </i> is an amazing platform with more that hundreds books. There are a lot of style's gender for every taste, you can check by library and find the right book at the right place according to your location.  </p>
      <p >Copyright &copy; 2022 All Rights Reserved by READBOOK </p>
      </div>
    </>
)
}
export default Footer;