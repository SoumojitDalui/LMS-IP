import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import "bootstrap/dist/css/bootstrap.min.css";

function SidebarBoot() {
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true);

  const navigate = useNavigate();

  const goPage = (label) => {
    if(localStorage.getItem('name') !== label && window.location.pathname !== '/check') {
      localStorage.setItem('nav', label);
      navigate('../check');
    }
    else if (window.location.pathname === '/check' && localStorage.getItem('name') !== label) {
      localStorage.setItem('nav', label);
      window.location.reload();
    }
    else if (window.location.pathname === '/check' && localStorage.getItem('name') === label) {
      if(localStorage.getItem('role') === 'Manager') {
        navigate('../mnger');
      }
      else if(localStorage.getItem('role') === 'Employee') {
        navigate('../emp');
      }
    }
  }

  return (
    <>
      <Button type="button" onClick={showSidebar}>
        | | |
      </Button>
      <Offcanvas show={show} onHide={closeSidebar}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Company Hierarchy:</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          <TreeItem nodeId="1" label="CEO">
            <TreeItem nodeId="2" label="MD">
              <TreeItem nodeId="3" label="Ugotisa" onDoubleClick={ () => goPage("Ugotisa")}>
                <TreeItem nodeId="4" label="Soumojit Dalui" onClick={ () => goPage("Soumojit Dalui")} />
                <TreeItem nodeId="5" label="Employee 2" onClick={ () => goPage("Employee 2")} />
              </TreeItem>
              <TreeItem nodeId="6" label="Manager 2" onDoubleClick={ () => goPage("Manager 2")}>
                <TreeItem nodeId="7" label="Employee 1" onClick={ () => goPage("Employee 1")} />
                <TreeItem nodeId="8" label="Employee 2" onClick={ () => goPage("Employee 2")} />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
        </Offcanvas.Body>  
      </Offcanvas>
    </>  
  )
}

export default SidebarBoot