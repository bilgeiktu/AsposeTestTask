using AsposeDrawingTeskTask.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AsposeDrawingTeskTask.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ILogger<FileController> _logger;

        public FileController(ILogger<FileController> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("GetFiles")]
        public  IActionResult GetFiles()
        {

            var filePaths = Directory.GetFiles( Path.Combine(_webHostEnvironment.ContentRootPath + "\\Files"));
            List<FileModel> files = new List<FileModel>();
            foreach (string filePath in filePaths)
            {
                files.Add(new FileModel { FileName = Path.GetFileName(filePath) });
            }

            return Ok(files);
        }
        [HttpPost("FileUpload")]
        [RequestFormLimits(MultipartBodyLengthLimit = 1073741824)]
        [RequestSizeLimit(1073741824)]

        public async Task<IActionResult> FileUpload(IFormFile formdata)
        {
            var array = new List<string>();
            var folderfilepath = "";
            var files = HttpContext.Request.Form.Files;
            var size = files.Sum(f => f.Length);
            var filePaths = new List<string>();
            foreach (var formFile in files)
            {
                var supportedTypes ="csv";
                var fileExt = Path.GetExtension(formFile.FileName).Substring(1);
                if (!supportedTypes.Contains(fileExt))
                {
                    var ErrorMessage = "File Extension Is InValid - Only Upload CSV File";
                    return Problem(ErrorMessage);
                }
                if (formFile.Length > 0)
                {
                    
                    var filePath = Path.Combine(_webHostEnvironment.ContentRootPath+"\\Files");
                    filePaths.Add(filePath);
                    using (var stream = new FileStream(filePath+"\\"+formFile.FileName, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    folderfilepath = filePath + "\\" + formFile.FileName;
                    var csv = new List<string[]>();
                    var lines = System.IO.File.ReadAllLines(folderfilepath);

                    foreach (string line in lines)
                        csv.Add(line.Split(','));

                    var properties = lines[0].Split(',');

                    var listObjResult = new List<Dictionary<string, string>>();

                    for (int i = 1; i < lines.Length; i++)
                    {
                        var objResult = new Dictionary<string, string>();
                        for (int j = 0; j < properties.Length; j++)
                            objResult.Add(properties[j], csv[i][j]);

                        listObjResult.Add(objResult);
                    }

                    var jsonString = JsonConvert.SerializeObject(listObjResult);
                    array.Add(jsonString);
                }
            

               
            }
            return Ok(new { array });
        }
    }
}
