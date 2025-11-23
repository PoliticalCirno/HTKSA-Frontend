export default function SportHero({ sport }){
  const map = { soccer:'banner-soccer', basketball:'banner-basketball', baseball:'banner-baseball', hockey:'banner-hockey' }
  const cls = `banner ${map[sport] || ''}`
  return (
    <div className={cls}>
      <div className="container">
        <h1 style={{fontSize:36, margin:'0 0 6px', fontWeight:900, textTransform:'uppercase'}}>{sport} Gear</h1>
        <p style={{opacity:.95, maxWidth:640}}>Engineered for speed, comfort, and style. Shop curated {sport} picks.</p>
      </div>
    </div>
  )
}
