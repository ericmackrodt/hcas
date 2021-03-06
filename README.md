# HCAS (Html and CSS Are Stupid)
--------------------------------
[![Build Status](https://travis-ci.org/ericmackrodt/hcas.svg?branch=master)](https://travis-ci.org/ericmackrodt/hcas) 
[![Coverage Status](https://coveralls.io/repos/github/ericmackrodt/hcas/badge.png?branch=master)](https://coveralls.io/github/ericmackrodt/hcas?branch=master)

Background
-----------

CSS and HTML can be two very difficult and unmanageable things, as your code base grows, readability can start to be an issue. Not only that, but doing trivial things in CSS, like vertical or horizontal alignment for example, can be very painful.

The idea with HCAS, as a proof of concept for now, is to create a markup language that is easier to read, to organize and easy to style. So, if you set a `VerticalAlignment="center"`, for example, the element should be vertically aligned without any pain. Also, when the concept of Resources is implemented, it will be easier to organize and apply styles (like CSS, but without the pain).

This project is being developed as a JS library that renders real html and CSS either directly in the browser or via node.js, but it would be awesome if, in the future, an engine was implemented for browsers to render HCAS files natively. But this is just an ambitious dream. Libraries for other platforms, like JAVA and ASP.NET, should be easier to implement though.

Oh, and yeah, it resembles Xaml.

Basic Example of Code:
-----------------------

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
-----------------------------------------

```
<!DOCTYPE html>
<html data-hcas-type="Page">
<head>
	<link rel="stylesheet" href="/stylesheets/hcasLayout.css">
</head>
<body>
    <div data-hcas-type="StackPanel">
        <h1 data-hcas-type="Header" class="stackPanelChild">This is the Header</h1>
        <div data-hcas-type="StackPanel" class="stackPanelChild">
            <button data-hcas-type="Button" class="stackPanelChild">Button Top</button>
            <p data-hcas-type="TextBlock" class="stackPanelChild">TextBlock with normal text property</p>
        </div>
        <p data-hcas-type="TextBlock" class="stackPanelChild">
            Before Text: This is a full, hardcoded paragraph where you can write full texts in the way you want.
        </p>
        <button data-hcas-type="Button" class="stackPanelChild">Button</button>
        <a data-hcas-type="HyperLink" href="http://www.wikipedia.org" class="stackPanelChild">Wikipedia</a>
    </div>
</body>
</html>
```

Contributing:
-------------

If you desire to contribute to the project with new features or fixes, please create a fork and, when finished, do a pull request against the master branch. The reason is so I can have more control of the code that is being pushed to the repo.
