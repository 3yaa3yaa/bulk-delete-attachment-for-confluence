import api,{ route } from "@forge/api";

export const getAttachments = async (id)=> {
    try{
        console.log(`Accessing to /rest/api/content/${id}/child/attachment`)
        const response = await api.asUser().requestConfluence(route`/rest/api/content/${id}/child/attachment`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if(response.status===200){
            const json = await response.json()
            return json
        }
        else{
            throw new Error(`Response: ${response.status} ${response.statusText}`)
        }

    }catch (e){
        console.log(e.message)
        // throw new Error(e.message)
    }
}

export const removeAttachment = async (id, filename)=> {
    try{
        console.log("remove data called")
        const response = await api.asUser().requestConfluence(route`/rest/api/content/${id}`, {
            method: 'DELETE'
        });
        console.log(`Response: ${response.status} ${response.statusText}`)

        if(response.status===204){
            return `${filename} has been deleted!`
        }
        else{
            throw new Error(`Response: ${response.status} ${response.statusText}`)
        }
    }catch (e)
    {
        console.log(e.message)
        throw new Error(e.message)
    }

}