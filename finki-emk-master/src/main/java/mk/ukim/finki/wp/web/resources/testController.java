package mk.ukim.finki.wp.web.resources;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class testController {
	
	@ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {

        byte[] bytes;
        String name = file.getOriginalFilename();
        String imgDestination= "src/main/webapp/app/imgs/products/";
        if (!file.isEmpty()) {
        	/*try{
             bytes = file.getBytes();
             File f = new File(imgDestination+name);
             System.out.println(f.getAbsolutePath());
             BufferedOutputStream stream =
                     new BufferedOutputStream(new FileOutputStream(f));
             stream.write(bytes);
             stream.close();
             return "You successfully uploaded " + name + "!";
         } catch (Exception e) {
             return "You failed to upload " + name + " => " + e.getMessage();
         }*/
        	
        	BufferedImage img = ImageIO.read(new ByteArrayInputStream(file.getBytes()));
        	File destination = new File(imgDestination+name);
        	ImageIO.write(img, "png", destination);
        	
        	return "You successfully uploaded " + name + "!";
     } else {
         return "You failed to upload " + name + " because the file was empty.";
     }
    }
	
}
