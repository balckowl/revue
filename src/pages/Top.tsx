import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Top = () => {

  const techIconArray =
    [
      'react.svg',
      'vitejs.svg',
      'typescript.svg',
      'bootstrap.svg',
      'emotion.png',
      'framer-motion.png',
      'react-hook-form.png',
      'zod.svg',
      'google-gemini.svg',
      'threejs.svg',
      'firebase.svg'
    ]

  return (
    <div className="container">

      <div className="hero d-flex justify-content-center">
        <div className="hero-inner">
          <motion.h2 className="hero-title mb-3">Programming is fun, isn't it?</motion.h2>
          <motion.div className="joinus-btn" whileTap={{ scale: 1.2 }}>
            <Link to="/signup/email">JOIN US</Link>
          </motion.div>
        </div>
      </div>

      <div className="works">
        <div className="row g-1">
          <div className="col-12">
            <div className="border">
              <h3 className="section-title">Product</h3>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="border p-4">
              <div className="work-img-box border-bottom pb-4 mb-2">
                <img src="/images/helplee.png" alt="" />
              </div>
              <div className="work-text-box">
                <h4 className="mb-2">Helplee</h4>
                <p>Helpleeとは、CSSを直感的にGUIで作成できるジェネレータサイトです。</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="border p-4">
              <div className="work-img-box border-bottom pb-4 mb-2">
                <img src="/images/superwindui.png" alt="" />
              </div>
              <div className="work-text-box">
                <h4 className="mb-2">SuperwindUI</h4>
                <p>SuperwindUIは、コンポーネントの単位を最大化し、構築速度により特化したUIライブラリです。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <div className="row g-1">
          <div className="col-12">
            <div className="border">
              <h3 className="section-title">Technology Stack</h3>
            </div>
          </div>
          {techIconArray.map((techIcon, index) => (
            <div className="col-lg-3 col-sm-6" key={index}>
              <div className="border py-4">
                <div className="tech-img-box">
                  <img src={`/images/${techIcon}`} alt="" />
                </div>
                {/* <div className="tech-text-box">
                <h3>React</h3>
              </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Top