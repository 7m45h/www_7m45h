+++
description = "list of actress I like"
draft = false
keywords = ["actress", "list"]
title = "sugar_crystals"
src = "content/blog/sugar_crystals.md"
+++

{{< sugar_lister.inline >}}
  {{ with site.Data.sugar_crystals | collections.Shuffle }}
    <ul>
      {{ range . }}
        {{ $name := ( collections.Index . 0 ) }}
        {{ $url := ( collections.Index . 1 ) }}
        <li><a href="{{ $url }}">{{ $name }}</a></li>
      {{ end }}
    </ul>
  {{ end }}
{{</ sugar_lister.inline >}}
