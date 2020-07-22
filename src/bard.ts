const levelUp = new Audio('../public/320655__rhodesmas__level-up-01.wav')

export const playSound = () => {
  levelUp.play()
  console.log('playing sound')
}

playSound()
