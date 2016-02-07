<script id="vs" type="x-shader/vertex"> 

	attribute vec2 position;
	attribute vec3 vcolor;
	varying vec3 color;

	void main()
	{
		gl_Position = vec4(position, 1.0, 1.0);
		color = vcolor;
	}

</script> 

<script id="fs" type="x-shader/fragment"> 

	varying vec3 color;

	void main(void)
	{
		gl_FragColor = vec4(color, 1.0);
	}

</script> 
