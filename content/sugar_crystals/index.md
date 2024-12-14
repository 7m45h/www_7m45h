+++
description = "list of actress I like"
draft       = false
keywords    = [ "actress", "list" ]
title       = "sugar_crystals"
gitremote   = "content/sugar_crystals"
controls    = "r: pick random"
[[powerdby]]
name = "pornpics"
link = "https://www.pornpics.com/"
[[powerdby]]
name = "elitebabes"
link = "https://www.elitebabes.com/"
+++

{{< sugar_lister.inline >}}
  {{ with site.Data.sugar_crystals | collections.Shuffle }}
    {{ range . }}
      {{ partial "anchor_card.html" ( dict "url" ( collections.Index . 1 ) "name" ( collections.Index . 0 ) "ext" true ) }}
    {{ end }}
  {{ end }}
{{</ sugar_lister.inline >}}
