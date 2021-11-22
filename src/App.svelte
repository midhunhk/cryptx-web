<script>
	import sha256 from 'crypto-js/sha256'
	import aes from 'crypto-js/aes'
	import CryptoJS from 'crypto-js'

	let inputTextArea = ''
	let outputTextArea = ''
	let key = ''
	let hashedKey = ''
	let errorMessage = ''

	const hash = (data) => {
		const hashDigest = sha256(data)
		return hashDigest + ""
	}

	const encrypt = () => {
		console.log('encrypt ' + key)
		if(inputTextArea.length == 0 || key.length == 0){
			errorMessage = 'Enter plaintext and key'
			return
		}

		errorMessage = ''
		outputTextArea = ''
		
		hashedKey = hash(key)
		const ciphertext = aes.encrypt(inputTextArea, hashedKey).toString()

		outputTextArea =  ciphertext
	}

	const decrypt = () => {		
		if(inputTextArea.length == 0 || key.length == 0){
			errorMessage = 'Enter the encrypted text and key'
			return
		}

		errorMessage = ''
		outputTextArea = ''
		
		hashedKey = hash(key)
		var bytes  = aes.decrypt(inputTextArea, hashedKey);
		var originalText = bytes.toString(CryptoJS.enc.Utf8);

		if(originalText.length == 0) {
			errorMessage = "Password is incorrect"
		} else {
			outputTextArea =  originalText
		}
	}
</script>

<main class="has-background-black-ter has-text-white is-fullheight">
	
	<div class="container">
		<div class="section">
			<h1 class="is-size-1 is-capitalized has-text-weight-light has-text-danger has-text-centered">CryptX Web</h1>
			<div class="py-4 has-text-centered">
				<p class="is-size-6">This is an app which can easily encrypt and decrypt text message using AES algorithm.
					<br/>The processing is done on the client side, so no data that you enter is sent through the network.</p>
			</div>

			<div class="columns is-centered my-1">
				<div class="column is-5">
					<div class="has-text-centered py-2">
						<p class="is-size-4">Input</p>
					</div>
					<div class="field">
						<div class="control">
						  <textarea class="textarea is-medium" placeholder="Enter text to encrypt or decrypt" bind:value={inputTextArea} required></textarea>
						</div>
					</div>
				</div>

				<div class="column is-5">
					<div class="has-text-centered py-2">
						<p class="is-size-4">Output</p>
					</div>
					<div class="field">
						<div class="control">
						  <textarea class="textarea is-medium has-background-white-bis" placeholder="Output will appear here" bind:value={outputTextArea} readonly></textarea>
						</div>
					</div>
				</div>

			</div>

			<div class="columns is-centered is-vcentered">
				<div class="column is-half p-4 has-rounded-corners">
					<div class="box mt-2 has-background-white-ter">
						<div class="field">
							<label class="label" for="key">Encryption Key</label>
							<div class="control">
							  <input class="input" type="text" placeholder="Enter Key" name="key" bind:value={key} required>
							</div>
						  </div>
			
						<div class="field is-grouped">
							<div class="control">
							  <button class="button is-danger" on:click={encrypt}>Encrypt</button>
							</div>
							<div class="control">
							  <button class="button is-danger" on:click={decrypt}>Decrypt</button>
							</div>
						</div>
	
						{#if errorMessage}
							<div class="has-background-danger-light p-2 mb-2">
								<p class="is-size-7">
									{errorMessage}
								</p>
							</div>
						{/if}
					</div>
				</div>
			</div>

		</div>
	</div>
</main>

<style>
	main {
		height: 100%;
	}
</style>