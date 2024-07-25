

<deep-chat
  id="chat-element"
  introMessage='{"text": "Rock, Paper, Scissors! Make your guess and see who wins!"}'
  style="border-radius: 8px"
></deep-chat>

<script>

  const chatElementRef = document.getElementById('chat-element');
  chatElementRef.demo = {
  response: (message) => {
  const options = ['rock', 'paper', 'scissors'];
  const userOption = message.text?.toLocaleLowerCase();
  const aiOption = options[Math.floor(Math.random() * 3)];
  let response = `I guessed ${aiOption}. `;
  if (userOption === aiOption) response += 'Draw';
  else if (userOption === 'rock') response += aiOption === 'paper' ? 'I win!' : 'You win!';
  else if (userOption === 'paper') response += aiOption === 'scissors' ? 'I win!' : 'You win!';
  else if (userOption === 'scissors') response += aiOption === 'rock' ? 'I win!' : 'You win!';
  else response = 'Guess either Rock, Paper or Scissors';
  return {text: response};
},
};
  </script>