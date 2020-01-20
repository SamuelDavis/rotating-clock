document.addEventListener('DOMContentLoaded', function () {
  function makeElement ({ tag = 'div', parent = document.body, styles = {} }) {
    const el = document.createElement(tag)
    Object.assign(el.style, styles)
    parent.appendChild(el)
    return el
  }

  Object.assign(document.body.style, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })
  let rot = 360 * (new Date().getSeconds() / 60)
  const clock = makeElement({
    styles: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderRadius: '100%',
      border: '6px double saddlebrown',
      backgroundColor: 'rosybrown',
      transform: `rotate(-${rot}deg)`
    }
  })
  clock.style.height = getComputedStyle(clock).width
  window.addEventListener('resize', () => {
    clock.style.height = getComputedStyle(clock).width
  })
  const time = makeElement({
    parent: clock, styles: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(.25turn, transparent calc(50% - 2px), saddlebrown 50%, transparent calc(50% + 2px))',
      transform: `rotate(${rot}deg)`,
    }
  })

  const numbers = 12
  for (let i = numbers; i > 0; i--) {
    makeElement({
      parent: clock, styles: {
        position: 'absolute',
        textAlign: 'center',
        vAlign: 'center',
        width: '100%',
        height: '100%',
        transform: `rotate(-${(360 / numbers) * (numbers - i)}deg)`,
      }
    }).innerText = i.toString()
  }

  const clockInterval = setInterval(() => {
    const now = new Date().getSeconds()
    const target = (now / 60) * 360
    const rotInterval = setInterval(() => {
      rot = Math.min(target, rot + 0.25)
      clock.style.transform = `rotate(${-rot}deg)`
      time.style.transform = `rotate(${rot}deg)`
      if (rot >= target) clearInterval(rotInterval)
    })
    time.innerText = Math.round(now).toString()
  }, 1000)
})
