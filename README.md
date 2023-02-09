I was inspired to create this app because I like to buy art pieces that are unique. Pieces that I know I won’t see in anyone else’s space. 
To ensure that you have an original piece of art, you can either get an artist to make you an original piece, which is expensive,  or you could create your own art pieces. However, what if you’re not an artist? For most of us, the idea of making original art with our hands is completely out of the question.
However, thanks to the rise in artificial intelligence, anyone can make original art with their words.

LazyArtis is an AI Art generator that uses the Dall-e 2 AI system from OpenAI. DALL·E is a version of GPT-3 that is trained to generate images from text descriptions. 


<h2>Demo</h2>

<h4>Registration & Login</h4>
<p>The user experience begins on the registration page. Once a user registers, they are redirected to their dashboard. I implemented JSON Web Tokens(JWT) and Bcrypt to secure this web app. JWTs  provide a way to securely pass information as a JSON object and allow us to use stateless authentication, meaning no information about the current user is stored on the server.</p>
<img src="https://media.giphy.com/media/AU3X4Weu55uKP0Exr6/giphy.gif" alt="login and registration"/>


<h4>Generating a Prompt</h4>
<p>Registered users are able to create an original prompt and also have the option to click "Generate Random Prompt" for inspiration. Once they submit their prompt, our AI artist will create an image based off the prompt and display it on the screen.</p>
<p><i>Note: OpenAI's API is a paid API and a small image is displayed for development purposes. In a production version of this web app, users would be able to choose the size and quality of their image and how many images they want generated per prompt.</i></p>
<img src="https://media.giphy.com/media/poqmkmeKUsnfltYk8c/giphy.gif" alt="generate image via prompt"/>

<h4>Viewing Image Gallery</h4>
<p>Users can click on "Your Images" to see the images they've generated in the past with a "picture frame" around each image, so the user can visualize how their art would look framed. The front end of this web app was built with JS, React, CSS, and bootstrap.</p>
<img src="https://media.giphy.com/media/DHt356A6RrNJusttb4/giphy.gif" alt="view image gallery"/>


<h2>:ledger: Future Features</h2>
<p>Some features I would love to add as I build out this web app in the future are:</p>

- [ ] The ability for users to use the "Cart" button to add their image to cart for shipping/framing.
- [ ] The ability for users to see their images in multiple frame types (such as wood, white, etc.)
- [ ] Implementation of a payment API (such as Stripe, PayPal, or Square) so users can purchase their images.

<h2>🛡️ License:</h2>
This project is licensed under the GNU General Public License v3.0
