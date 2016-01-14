# HCAS (Html and CSS Are Stupid)
--------------------------------
This is a pet project of mine.

Yeah, it resembles Xaml.

Basic Example of Code:

```
<Page>
	<StackPanel>
		<Header text="This is the Header" />
	    <StackPanel>
	    	<Button content="Button Top" />
	    	<TextBlock text="TextBlock with normal text property" />
	    </StackPanel>
		<TextBlock>
			<TextBlock.Text>
				Before Text: This is a full, hardcoded paragraph where you can write full texts in the way you want.
			</TextBlock.Text>
		</TextBlock>
		<Button content="Button" />
		<HyperLink content="Wikipedia" url="http://www.wikipedia.org" />
	</StackPanel>
</Page>
```

The output from the proof of concept should be: 

```
<!DOCTYPE html>
<html data-hcas-type="Page">
<head>
</head>
<body>
    <div data-hcas-type="StackPanel">
        <h1 data-hcas-type="Header">This is the Header</h1>
        <div data-hcas-type="StackPanel">
            <button data-hcas-type="Button">Button Top</button>
            <p data-hcas-type="TextBlock">TextBlock with normal text property</p>
        </div>
        <p data-hcas-type="TextBlock">
            Before Text: This is a full, hardcoded paragraph where you can write full texts in the way you want.
        </p>
        <button data-hcas-type="Button">Button</button>
        <a data-hcas-type="HyperLink" href="http://www.wikipedia.org">Wikipedia</a>
    </div>
</body>
</html>
```