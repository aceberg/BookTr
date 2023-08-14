package web

import (
	"net/http"

	"github.com/aceberg/booktr/internal/models"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	var guiData models.GuiData
	guiData.Config = AppConfig

	guiData.Tr.Left = "	Its been 8 months since the ‘Civil War as the media likes to call it happened. 7 months since Tony Stark woke up from multiple surgeries, including putting a new Arc reactor into his badly broken chest. Thanks to Dr. Cho and a new version of the Extremis virus, he was able to not only survive those surgeries but was able to heal easier. So instead of taking years to get back on his feet, it took a few weeks. Extremis had also helped heal more than his chest and wounds from Siberia. Now Tony looked a bit younger, the grays in his hair and his wrinkles were gone, some of the more minor scars were no longer visible, and he felt like he truly was a younger man."

	execTemplate(w, "index", guiData)
}
