# Mixup - A/B Testing with Mixpanel

A solution to easily launch A/B test campaigns on HTML pages, and record the results to mixpanel.

## Using it

Setup blocks in your html for you ab tests.

```html
<div class="ab-test" data-ab-group="Link Copy" data-ab-id="Variation One">
  <a href="#">Link Text One</a>
</div>
<div class="ab-test alt" data-ab-group="Link Copy" data-ab-id="Variation Two">
  <a href="#">Link Text Two</a>
</div>
```

Add the Javascript to the bottom of your body tag.
```js
<script>
  $(document).ready(function() {
    $(".ab-test").mixup();
  })
</script>
```

For a working example see: [index.html](http://j-mcnally.github.io/mixup/)

## Mixpanel

Clicks to the content in the blocks will be captured in Mixpanel.

<img width="932" alt="example" src="https://cloud.githubusercontent.com/assets/892382/13126010/73e34bc6-d58e-11e5-9d2d-8515ec4ba6ab.png">
